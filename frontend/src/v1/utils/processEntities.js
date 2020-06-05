import pluralize from 'pluralize';
import * as R from 'ramda';
import entityProcessors from './entity_processors';

const processEntities = (dispatch, entities) => {
  R.forEach(
    (entitiesKey) => {
      const entityName = pluralize.singular(entitiesKey);
      if (R.type(entities[entitiesKey]) === 'Object') {
        entityProcessors[entityName](dispatch, entities[entitiesKey]);
      } else {
        R.forEach(
          (entity) => {
            entityProcessors[entityName](dispatch, entity);
          },
          entities[entitiesKey],
        );
      }
    },
    R.keys(entities),
  );
};

export default processEntities;
