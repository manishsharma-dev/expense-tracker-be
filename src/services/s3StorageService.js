const path = require('path');
const { GetObjectCommand, PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');

const getS3Client = () => {
  const config = {
    region: process.env.AWS_REGION,
  };

  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
  }

  return new S3Client(config);
};

const normalizePrefix = (prefix = '') => prefix.replace(/^\/+|\/+$/g, '');

const safeFileName = (fileName = 'receipt') => {
  const extension = path.extname(fileName);
  const baseName = path.basename(fileName, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

  return `${baseName || 'receipt'}${extension.toLowerCase()}`;
};

const buildObjectKey = (userId, originalName) => {
  const prefix = normalizePrefix(process.env.AWS_S3_PREFIX || 'receipts');
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 10);
  const fileName = safeFileName(originalName);
  const key = `${userId}/${timestamp}-${random}-${fileName}`;

  return prefix ? `${prefix}/${key}` : key;
};

const buildPublicUrl = (bucket, region, key) => {
  if (process.env.AWS_S3_PUBLIC_BASE_URL) {
    return `${process.env.AWS_S3_PUBLIC_BASE_URL.replace(/\/+$/g, '')}/${key}`;
  }

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

const uploadReceiptToS3 = async (file, userId) => {
  if (!file) return undefined;

  const bucket = process.env.AWS_S3_BUCKET;
  const region = process.env.AWS_REGION;

  if (!bucket || !region) {
    throw Object.assign(new Error('S3 storage is not configured'), { statusCode: 500 });
  }

  const key = buildObjectKey(userId, file.originalname);
  const uploadResult = await getS3Client().send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ContentLength: file.size,
    Metadata: {
      originalName: file.originalname,
      uploadedBy: `${userId}`,
    },
  }));

  return {
    storageProvider: 's3',
    originalName: file.originalname,
    fileName: path.basename(key),
    bucket,
    key,
    path: buildPublicUrl(bucket, region, key),
    url: buildPublicUrl(bucket, region, key),
    mimeType: file.mimetype,
    size: file.size,
    etag: uploadResult.ETag,
  };
};

const getReceiptFromS3 = async (receipt) => {
  if (!receipt?.bucket || !receipt?.key) {
    throw Object.assign(new Error('Receipt file not found'), { statusCode: 404 });
  }

  return getS3Client().send(new GetObjectCommand({
    Bucket: receipt.bucket,
    Key: receipt.key,
  }));
};

module.exports = {
  getReceiptFromS3,
  uploadReceiptToS3,
};
