
[ERROR] 501 - Error: Entity "BillingDocService.ZBillingDocument" is annotated with "@cds.persistence.skip" and cannot be served generically.

sol: 
if you expose an entity with this annotation, you have to implement your own logic to e.g. READ data from this entity, which is not part of your CAP model.
https://awesome.ecosyste.ms/projects/github.com%2Fgregorwolf%2Fcap-service-mashup

