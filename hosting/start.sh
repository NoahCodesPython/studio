#!/bin/bash

# Colors for output
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
RESET="\033[0m"

# Function to print messages with colors
log_success() {
    echo -e "${GREEN}[SUCCESS] $1${RESET}"
}

log_warning() {
    echo -e "${YELLOW}[WARNING] $1${RESET}"
}

log_error() {
    echo -e "${RED}[ERROR] $1${RESET}"
}

# Install PM2 globally if it's not already installed
echo "⏳ Installing PM2 if not already present..."
if ! command -v pm2 &> /dev/null; then
    if npm install -g pm2; then
        log_success "PM2 installed successfully."
    else
        log_error "Failed to install PM2."
        exit 1
    fi
else
    log_success "PM2 is already installed."
fi

# Clean up temporary directory
echo "⏳ Cleaning up temporary files..."
if rm -rf /home/container/tmp/*; then
    log_success "Temporary files removed successfully."
else
    log_warning "Failed to remove temporary files. Continuing anyway."
    # exit 1 # Removed exit 1 to allow script to continue even if cleanup fails
fi

# Install Node.js dependencies if node_modules does not exist
echo "⏳ Installing Node.js dependencies..."
if [ ! -d "node_modules" ]; then
  if npm install; then
      log_success "Node.js dependencies installed successfully."
  else
      log_error "Failed to install Node.js dependencies."
      exit 1
  fi
else
  log_warning "node_modules already exists. Skipping dependency installation."
fi

# Build the Next.js application
echo "⏳ Building Next.js application..."
if npm run build; then
    log_success "Next.js application built successfully."
else
    log_error "Failed to build Next.js application."
    exit 1
fi

# Start the Next.js application using PM2
echo "⏳ Starting Next.js application with PM2..."
# Stop any existing PM2 process with the same name before starting a new one
pm2 stop my-next-app 2>/dev/null
pm2 delete my-next-app 2>/dev/null

if pm2 start npm --name "my-next-app" -- run start -- --port 3000 --hostname 0.0.0.0 --max-memory-restart 200M; then
    log_success "Next.js application started with PM2."
else
    log_error "Failed to start Next.js application with PM2."
    exit 1
fi

# Optional: Save the PM2 process list to automatically restart on boot
# You might need to run `pm2 startup` once manually on the server
# to configure this.
# pm2 save

# Final message
log_success "Startup script finished."

# Keep the script running to prevent the container from stopping
# if it's not managed by an external process like the panel.
# If your panel keeps the container alive, you might not need this.
# tail -f /dev/null
