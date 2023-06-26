# VS Code - Dev Containers

## Setup Docker Remote Context

```bash
docker context create sandbox.dams ‐‐docker “host=ssh://user@sandbox.dams.library.ucdavis.edu
```

## Make sure dev container exists

Create docker volume

```bash
docker volume create [collection-name]
```

Create container to work in

```bash
docker run -d --name [collection-name]-import -v [collection-name]:/data gcr.io/ucdlib-pubreg/dams-base-service:sandbox bash -c "tail -f /dev/null"
```

example:

```bash
docker run -d --name sherry-lehmann-import -v sherry-lehmann:/data gcr.io/ucdlib-pubreg/dams-base-service:sandbox bash -c "tail -f /dev/null"
```

Now you have a container `[collection-name]-import` with the volume `[collection-name]` mounted at `/data`

## Setup VS Code

Set your docker context to remote host

```bash
docker context use sandbox
```

https://code.visualstudio.com/docs/devcontainers/attach-container

 - type `command+p` to open command palette
 - type `>`
 - type `Dev Containers: Attach to Running Container` and select

You may be prompted for your password if you haven't setup ssh keys to the remote server.

You should now get a new window.  If this is your first time open a vs code in the container, if may take a few minutes for VS Code to install the extensions and setup the remote dev environment.  You should see 'Opening Remote...' in the bottom left corner and 'Starting Dev Container...' on the bottom bar as well.  You can click this to see the progress.

Once the container is setup, open the files left side bar and navigate to `/data` to see the files in the volume.  If this is the first time opening the container, click the `Open Folder` button and select `/data` to open the volume in the editor.

