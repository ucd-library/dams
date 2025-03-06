-- check if binary containers have rdf types
CREATE OR REPLACE VIEW debug_binary_containers AS
with container_types as (
  select 
    ss.fedora_id,
    array_agg(srt.rdf_type_uri) as rdf_types
  from simple_search ss
  left join search_resource_rdf_type srrt on ss.id = srrt.resource_id
  left join search_rdf_type srt on srrt.rdf_type_id = srt.id
  group by ss.fedora_id
)
select count(*) 
from container_types
where 
  fedora_id ~ '\.[a-z0-9]+$' and 
  not ('http://fedora.info/definitions/v4/repository#Binary' = ANY(rdf_types));