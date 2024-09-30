FROM node:20-alpine

WORKDIR /app

# Define build arguments for each environment variable

ARG API_BASE_URL=https://api.timlukfab.com
ARG NEXT_PUBLIC_API_BASE_URL=https://api.timlukfab.com
ARG NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_49e59d694b9f640b9fd2d1c41875ea5cfba533e0
ARG NEXT_PUBLIC_PAYSTACK_SECRET_KEY=sk_test_5df67ce9e6964fd220eb85a2399473ebdb0f9fc4

# Set environment variables using the build arguments
ENV NODE_ENV=production
ENV API_BASE_URL=${API_BASE_URL}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=${NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}
ENV NEXT_PUBLIC_PAYSTACK_SECRET_KEY=${NEXT_PUBLIC_PAYSTACK_SECRET_KEY}

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]