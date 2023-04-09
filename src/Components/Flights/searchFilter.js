import React from 'react';
import SelectDropdown from '../Common/dropdown';
import { useState } from 'react';
import { getFilterStrategies } from './flight-service';


function SearchFilter(props) {
    return (
        <div>
            <SelectDropdown 
            label="Reorder"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

export default SearchFilter;