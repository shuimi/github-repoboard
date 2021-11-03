import React, { FC, useState } from 'react';
import { Pagination, Empty } from 'antd';
import "antd/dist/antd.css";


const App: FC = () => {

    const [ page, setPage ] = useState<Number>(1);

    const onPageChange = (page: Number, pageSize?: Number) => {
        setPage(page);
    }

    const pageSizeOptions = [ '5', '10' ];

    return (
        <div>
            { page }
            <Empty description={ false }/>
            <Pagination total={ 7 } pageSizeOptions={ pageSizeOptions } onChange={ onPageChange } showSizeChanger/>
        </div>
    );
}

export default App;
