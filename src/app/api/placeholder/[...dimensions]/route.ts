import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get dimensions from the URL path
  const dimensions = request.nextUrl.pathname
    .replace('/api/placeholder/', '')
    .split('/');
    
  const [width, height] = dimensions;

  // Create an SVG placeholder with the specified dimensions
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial" 
        font-size="14"
        fill="#666"
        text-anchor="middle"
        dy=".3em"
      >${width}×${height}</text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}