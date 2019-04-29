import React from 'react';

import { TableHead, TableCell, TableRow } from '@material-ui/core';

const tableHead = (props) => {
    return (

        <TableHead >
            <TableRow>
                {Object.values(props.fields).map(field => (
                    < TableCell key={field} >{field}</TableCell>
                ))}
                </TableRow>
        </TableHead >
            )
        
        }
        
        export default tableHead
