import { ReactElement } from 'react';

import { BaseLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import Sidebar from '@/components/Sidebar/Sidebar';

export const getLayoutWithSidebar = (page: ReactElement) => {
    return (
        <BaseLayout>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Sidebar />
                <div style={{ width: '100%' }}>{page}</div>
            </div>
        </BaseLayout>
    );
};
