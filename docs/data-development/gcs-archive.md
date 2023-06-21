# Using GCS Coldline Storage Binary Archive

Binary files kept in Google Cloud Storage.  This document walks you through the process of syncing a dev container with the coldline storage bucket.

## Open shell to dev container

```bash
docker exec -it [collection-name]-import bash
```
Note, you need to either `ssh` to sandbox OR you can setup a docker remote context.  See [data-dev-container.md](data-dev-container.md) for more info.  To use the context run the following commend BEFORE the above command:

```bash
docker context use sandbox.dams
```

## Authenticate

Make sure the service account is added to data dev container

```bash
docker cp [path-to-service-account]/service-account.json [collection-name]-import:/

docker exec -it [collection-name]-import bash

gcloud auth activate-service-account --key-file=/service-account.json
```


## Sync data to coldline bucket

```bash
cd /data
gsutil -m rsync -c -J -r -y ".git" -n . gs://dams-collections/[collection-name]
```

`-n` flag is dry run.  Remove to actually sync.  Note this doesn't delete.  See docs here: https://cloud.google.com/storage/docs/gsutil/commands/rsync