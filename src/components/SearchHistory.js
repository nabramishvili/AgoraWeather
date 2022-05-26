import React from "react"
import { Collapse, Typography } from "antd"
import Forecast from "./Forecast"
const { Panel } = Collapse
const { Title } = Typography

const SearchHistory = ({ history }) => {
  if (!history.length)
    return <Title level={2}> Search history will appear here... </Title>

  return (
    <>
      <Title level={2}>Previously Searched</Title>
      <Collapse>
        {history.map((forecast) => (
          <Panel header={forecast.city} key={forecast.city}>
            <Forecast forecast={forecast} />
          </Panel>
        ))}
      </Collapse>
    </>
  )
}

export default SearchHistory
