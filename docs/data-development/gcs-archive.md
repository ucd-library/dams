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

Make sure the service account key is added to data dev container.  For example, if your key is in a google secret, then 

```bash
# Get your secret / copy to your machine
key=dams-collection-archiver-key
col=[collection-name]
gcloud secrets versions access latest --secret=${key} > key.json

docker cp key.json ${col}-import:/etc/service-account.json

docker exec -it ${col}-import bash
```

Then inside the import container...

```bash
gcloud auth activate-service-account --key-file=/etc/service-account.json
```


## Sync data 

### To bucket From container

```bash
cd /data
gsutil -m rsync -c -J -r -y "^(\.git|.*\.jsonld\.json)$" -n /data gs://dams-collections/[collection-name]
```

or the above combined more succintly, run all this on your local machine

```bash
col=wine-labels # for example
key=dams-collection-archiver-key
docker context use sandbox.dams
gcloud secrets versions access latest --secret=${key} > key.json
docker cp key.json ${col}-import:/etc/service-account.json
docker exec -i -t ${col}-import bash -c "{ gcloud auth activate-service-account --key-file=/etc/service-account.json; gcloud storage  rsync --continue-on-error --gzip-in-flight-all --recursive --exclude='^(\.git|.*\.jsonld\.json)\$' --dry-run /data gs://dams-collections/${col}; rm /etc/service-account.json}"

```



### From bucket to container

```bash
gsutil -m rsync -c -J -r -y ".*\.jsonld\.json$"   gs://dams-collections/[collection-name] /data
```

`-n` flag is dry run.  Remove to actually sync.  Note this doesn't delete.  See docs here: https://cloud.google.com/storage/docs/gsutil/commands/rsync

