import * as R from 'ramda';

const getChildren = (objectsKey, obj, arr, selectChildren) => (
  R.map(
    o => ({ ...o, [objectsKey]: getChildren(objectsKey, o, arr, selectChildren) }),
    selectChildren(obj, arr),
  )
);

const buildTreeFromArray = (objectsKey, arr, selectRootObjects, selectChildren) => {
  const rootObjects = selectRootObjects(arr);
  return R.map(
    obj => ({ ...obj, [objectsKey]: getChildren(objectsKey, obj, arr, selectChildren) }),
    rootObjects,
  );
};

export default buildTreeFromArray;
