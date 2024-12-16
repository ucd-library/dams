#! /bin/bash

apt update
apt install -y \
  apt-transport-https \
  ca-certificates \
  gnupg \
  lsb-release \
  gcc \
  python3-dev \
  python3-setuptools \
  python3-pip \
  rsync

pip3 uninstall crcmod
pip3 install --no-cache-dir -U crcmod

mkdir -p /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | tee /etc/apt/sources.list.d/kubernetes.list

apt-get update 
apt-get install -y \
  kubectl \
  google-cloud-sdk-gke-gcloud-auth-plugin

apt uninstall -y gcc python3-dev python3-pip
rm -rf /var/lib/apt/lists/*
apt-get clean
