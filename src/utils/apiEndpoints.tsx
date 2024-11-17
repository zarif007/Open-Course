export const v1MainEndpoint =
  'https://msv0yca780.execute-api.us-west-2.amazonaws.com/api/v1';

export const nextApiEndPoint =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : getProdApiEndPoint();

export const mainEndPoint =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : getProdMainEndPoint();

function getProdApiEndPoint() {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    if (origin === 'https://open-course.vercel.app') {
      return 'https://open-course.vercel.app/api';
    } else if (origin === 'https://www.open-course.net') {
      return 'https://www.open-course.net/api';
    }
  }
  // Fallback or default production endpoint
  return 'https://open-course.vercel.app/api';
}

function getProdMainEndPoint() {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    if (origin === 'https://open-course.vercel.app') {
      return 'https://open-course.vercel.app';
    } else if (origin === 'https://www.open-course.net') {
      return 'https://www.open-course.net';
    }
  }
  // Fallback or default production endpoint
  return 'https://open-course.vercel.app';
}

export const notificationApiEndpoint =
  'https://open-course-notification.onrender.com';

export const notificationApiEndpointDevelopment = 'http://localhost:5001';
