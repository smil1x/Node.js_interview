CREATE TABLE public.object (
    "objectId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(256),
    description text,
    tags character varying(256)[],
    metadata jsonb,
    "versionNumber" integer DEFAULT 0,
    "createdBy" character varying(256),
    "createdAt" timestamp without time zone NOT NULL,
    "updatedBy" character varying(256),
    "updatedAt" timestamp without time zone NOT NULL
);

ALTER TABLE ONLY public.object
    ADD CONSTRAINT object_pk PRIMARY KEY ("objectId");