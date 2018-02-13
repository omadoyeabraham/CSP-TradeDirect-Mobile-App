//  JUST A COMPEDIUM OF HELPERS FUNCTIONS USED ONLY BT THE STORE

/**
 * Convert an array of objects to a client side entity object map.
 * This aids the quick retrieval and lookup of data.
 *
 * @param {any} [sourceArray=[]] The array containing the objects to be converted to entities
 * @param {string} [entityKey='id'] The unique object key to be used as the primary key for each entity
 * @param {any} [oldStateEntities={}] Initial state entities, used because of redux so no state data is omitted
 * @export convertArrayToEntities
 */
export function convertArrayToEntities<T>(
  sourceArray: Array<T> = [],
  entityKey = "id",
  oldStateEntities = {}
): { [entityKey: number]: T } {
  const entities = sourceArray.reduce(
    (entities: { [entityKey: number]: T }, arrayElement) => {
      return {
        ...entities,
        [arrayElement[entityKey]]: arrayElement
      };
    },
    {
      ...oldStateEntities
    }
  );

  return entities;
}
