import React from 'react'

import { Table, Placeholder } from 'semantic-ui-react'

const LoadingTabel = (props) => {

    return(
        <Table.Row className="weather-block">
             <Table.Cell>
                <Placeholder>
                    <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                </Placeholder>
             </Table.Cell>
        </Table.Row>
    )
}
export default LoadingTabel;