import React, { useState, useEffect } from 'react';
import { getAllAssets } from '../../ducks/services';
const addAsset = () => {
  const [assetList, setAssetList] = useState([]);
  useEffect(() => {
    getAllAssets().then((response) => setAssetList(response?.data?.data));
  }, []);
  return [
    {
      type: 'select',
      label: 'Asset No.',
      name: 'asset_no',
      placeholder: 'Enter Asset No',
      req: true,
      reqmessage: 'Asset Number required',
      twocol: false,
      options: assetList.map((value) => ({ label: value.name, value: value.name })),
    },
    {
      type: 'date',
      label: 'Start Date',
      name: 'start_date',
      req: true,
      reqmessage: 'date required',
      twocol: true,
    },
    {
      type: 'date',
      label: 'End Date',
      name: 'end_date',
      req: true,
      reqmessage: 'date required',
      twocol: true,
    },
    {
      type: 'input',
      label: 'Description',
      name: 'description',
      placeholder: 'Description',
      req: true,
      reqmessage: 'Description required',
      twocol: false,
    },
  ];
};
export { addAsset };
