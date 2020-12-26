
import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { SONGS } from './Song'
import TEXT from '../config/text'

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
`

const List = styled.ul`
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  max-width: 600px;
  justify-content: center;
`

const ListItem = styled.li`
  display: inline-block;
  margin: 10px;

  a {
    display: block;
    padding: 18px 22px;
    border: 1px dotted #333;
  }
`

const Message = styled.p`
  padding-top: 40px;
  max-width: 600px;
  text-align: center;
  color: #999;
`

const code = `mnqgdbptkhsfvxjwyrl`

function toString(value, code) {
  var digit,
      radix= code.length,
      result = '';

  do {
      digit = value % radix;
      result = code[digit] + result;
      value = Math.floor(value / radix);
  } while (value)

  return result;
}

const Home = () => {
  const songLinks = Object.keys(SONGS).map((id) => (
    <ListItem key={id}>
      <Link to={`/tune/${id}`}>{TEXT.song} {TEXT.format(toString(id - 1, code))}</Link>
    </ListItem>
  ))
  return (
    <Navigation>
      <List>
        {songLinks}
      </List>
      <Message><Link to={`/code/home`}>{TEXT.about.title}</Link></Message>
    </Navigation>
  )
}

export default Home
