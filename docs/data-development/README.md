# DAMS Data Development

This directory contains various data development recipes.  Please see lists below on order of operations.

For any large operation; data import/export from fin or gcs, `byobu` is recommended.

 - [Pulling/Porting From DAMS v1](#pullingporting-from-dams-v1)
 - [Add New Collection](#add-new-collection)
 - [Updating Metadata](#updating-metadata)
 - [Updating Binaries - Pulling from DAMS Storage Bucket](#pulling-from-dams-storage-bucket)
 - [Cleanup](#cleanup)


## Pulling/Porting From DAMS v1

If your are exporting data from the original (v1) version of the DAMS powered by Fedora 4.

 - [Create Data Development Container](data-dev-container.md)
 - [Export from DAMS v1](dams-v1-data-export.md)
 - Fix up data
 - Import data via `fin io import`
 - [Create Metadata Repo](git-metadata-repo.md)
 - [Create GCS Archive](gcs-archive.md)

## Add New Collection

 - [Create Data Development Container](data-dev-container.md)
 - Copy data/metadata to sandbox server
 - Copy data/metadata to `/data` folder
   - `docker cp [path-to-data] [collection-name]-import:/data`
 - Import data via `fin io import`
 - [Create Metadata Repo](git-metadata-repo.md)
 - [Create GCS Archive](gcs-archive.md)

## Updating Metadata

If you are just updating metadata in a collection that is already in DAMS v2.

 - Pull metadata from GitHub `git clone git@github.com:ucd-library/dams-[collection-name]-metadata.git`
 - Fix up metadata
 - Import data via `fin io import`
 - Push metadata to GitHub eg `git commit/push`

## Pulling from DAMS Storage Bucket

This is for data management work that involves `binary` updates!  If you are just updating metadata, see above.

 - [Create Data Development Container](data-dev-container.md)
 - [Sync data from GCS](gcs-archive.md)
 - [Pull metadata from GitHub](git-metadata-repo.md)
   - see the `pull and merge` section
 - Fix up data
 - Import data via `fin io import`
 - Push metadata to GitHub eg `git commit/push`
 - [Sync data to GCS](gcs-archive.md)
   - Note: if you deleted/moved files.  Make sure the enable the proper `gsutil rsync` flags.

## Cleanup

To cleanup your data development container.  You can keep a couple dev containers/volumes around on sandbox, but the machine will fill up! So when you think collection development is complete, do the following:

 - Make sure your data is backed up to GCS! [Run the sync to GCS](gcs-archive.md)
 - Push your metadata to GitHub! eg `git commit/push`
 - Delete your data development container
   - `docker rm [collection-name]-import`
 - Delete your data development container volume
   - `docker volume rm [collection-name]`
  