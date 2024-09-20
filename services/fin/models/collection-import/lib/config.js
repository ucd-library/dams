import {config} from '@ucd-lib/fin-service-utils';

config.k8s = {
  enabled : env.K8S_DISABLED === 'true' ? false : true,
  platform : env.K8S_PLATFORM || 'docker-desktop',
  cluster : env.K8S_CLUSTER || 'fin',
  region : env.K8S_REGION || 'us-central1-c',
  templatesRoot : env.K8S_TEMPLATES || '/etc/fin/k8s-templates',
  collectionImport : {
    templateName : env.K8S_COLLECTION_IMPORT_TEMPLATE_NAME || 'collection-import',
    image : env.K8S_COLLECTION_IMPORT_IMAGE,
    overlay: env.K8S_COLLECTION_IMPORT_OVERLAY,
    url : env.K8S_COLLECTION_IMPORT_URL,
    localDevHostPath : env.K8S_COLLECTION_IMPORT_LOCAL_DEV_HOST_PATH || '/mnt/'
  }
}