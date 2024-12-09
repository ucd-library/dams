# Git Metadata Repository

All metadata for the DAMS will be stored in a GitHub repository for easy retrival and updates.  This document describes the process for creating a new repository.  As well as pulling and merging from GCS coldline storage.

### Create a new repository

Create a new repository in the [UCD Library GitHub](https://github.com/ucd-lib).  The name should use the following format: `dams-[collection-name]-metadata`.  For example, if your collection name is `sherry-lehmann`, your repository name should be `dams-sherry-lehmann-metadata`.

Make sure to add a .gitignore to your root folder:

```.gitignore
*
!.gitignore
!LICENSE
!*/
!*.jsonld.json
!*.md
```

### Initial Push to GitHub

Push your data to GitHub

```bash
git init
git add .gitignore #import to do this first!!
git add --all
git commit -m "Initial commit"
git branch -M main
# Note: we are using https here, so you will need to 
# provide your GitHub username and access token (password)
# see https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token
git remote add origin https://github.com/ucd-library/dams-[collection-name]-metadata
git push -u origin main
```

### Pull and Merge

To pull and merge from GCS, do the following.

 - See [GCS Archive](gcs-archive.md) for instructions on syncing data from GCS coldline storage.  Perform this step first in the /data folder of your [data development container](data-dev-container.md).
 - Next, clone the metadata repo from GitHub.  This will create a new folder in your data development container called `dams-[collection-name]-metadata`.  This folder will contain the metadata from GitHub.
  - `cd /data`
  - `git clone https://github.com/ucd-library/dams-[collection-name]-metadata.git`
  - `cp -r dams-[collection-name]-metadata/* .`
  - `cp -r dams-[collection-name]-metadata/.g* .`
  - `rm -rf dams-[collection-name]-metadata`
