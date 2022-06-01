export const findContentRowQuery = `
    SELECT item as row, position as "rowNumber"
    FROM object, jsonb_array_elements(content) 
    WITH ORDINALITY arr(item, position)
    WHERE "objectId"=$1 and item->>$2 = $3`;

export const updateContentQuery = `
    UPDATE object
    SET "updatedAt" = CURRENT_TIMESTAMP(0),
    content = jsonb_set(content, array[item_index::text, $4], $2)
    FROM CAST((SELECT position - 1
    FROM object, jsonb_array_elements(content) 
    WITH ORDINALITY arr(item, position) 
    WHERE "objectId"=$1 and item->>$5 = $3) as int)
    as item_index 
    WHERE "objectId" = $1
    RETURNING content::jsonb->item_index->$4 as "updatedValue"`;
