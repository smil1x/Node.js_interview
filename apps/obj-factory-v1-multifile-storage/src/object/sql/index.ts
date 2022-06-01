export const findUploadedFileRowQuery = `
    SELECT item as row, position as "rowNumber"
    FROM object, jsonb_array_elements(metadata->'object_uploaded_files') 
    WITH ORDINALITY arr(item, position)
    WHERE "objectId"=$1 and item->>'s3Key' = $2`;
