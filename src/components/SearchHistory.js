import React from "react"
import { Collapse, Typography } from "antd"
import Forcast from "./Forcast"
const { Panel } = Collapse
const { Title } = Typography

const SearchHistory = ({ history }) => {
  if (!history.length)
    return <Title level={2}> Search history will appear here... </Title>

  return (
    <>
      <Title level={2}>Previusly Searched</Title>
      <Collapse>
        {history.map((forcast) => (
          <Panel header={forcast.city} key={forcast.city}>
            <Forcast forcast={forcast} />
          </Panel>
        ))}
      </Collapse>
    </>
  )
}

export default SearchHistory
