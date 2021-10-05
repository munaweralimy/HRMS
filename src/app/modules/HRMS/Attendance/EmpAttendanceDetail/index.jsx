import React, { useState, useEffect } from 'react';
import EmpAttendance from '../components/EmpAttendance';
import StaffDetails from '../../StaffDetails';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAdvancementdetails, emptyStaffDetails } from '../../Advancement/dcuks/action';

export default (props) => {

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdvancementdetails(id));
    return () => {
      dispatch(emptyStaffDetails())
    }
  }, []);

  return (
    <StaffDetails id={id} section="Attendance" title={'Attendance'}>
      <EmpAttendance />
    </StaffDetails>
  );
};