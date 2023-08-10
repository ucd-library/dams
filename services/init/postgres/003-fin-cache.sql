set search_path=fin_cache,public;

CREATE INDEX IF NOT EXISTS quads_value_idx ON quads(object_value);

CREATE OR REPLACE VIEW dams_links AS
  with collection_ids as (
    SELECT id FROM search_rdf_type WHERE rdf_type_uri = 'http://schema.org/Collection'
  ),
  collection_uris as (
    SELECT 
      ss.fedora_id 
    FROM 
      simple_search ss
    LEFT JOIN search_resource_rdf_type srt ON ss.id = srt.resource_id
    WHERE srt.rdf_type_id IN (SELECT id FROM collection_ids)
  ),
  collection_items as (
    SELECT
      cu.fedora_id as collection,
      item.object as item
    FROM collection_uris cu
    LEFT JOIN quads_view item ON cu.fedora_id = item.subject AND item.predicate = 'http://schema.org/hasPart'
  )
  SELECT
    ci.*,
    edits.subject as edit
  FROM collection_items ci
  RIGHT JOIN quads_view edits ON 
    ci.item = edits.object AND 
    edits.predicate = 'http://schema.org/isPartOf' AND
    edits.subject like 'info:fedora/application/ucd-lib-client/item/%'
  WHERE ci.item IS NOT NULL;