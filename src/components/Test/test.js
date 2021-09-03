import React from 'react'

function Test(props) {
    const { title, changeTitle } = props

    return (
        <>
            <h1>{title}</h1>
            <button onClick={() => changeTitle('什么桂')}>哈哈</button>
        </>
    )
}

export default Test