import React from 'react'

export default function Home() {

    return (
        <div>
            <div style={{color: "blue",fontWeight:"bold",textAlign: "center", fontSize: "30px", textDecoration:"underline"}}>Home</div>
            <img style={{width:'200px', height: '50px', marginLeft:'45%'}} src="/icon.png"/>
            <div>Welcome to my site !</div>
            
            <br/>
            <a href='/products'>To products page - Click me</a>
        </div>
    )
}
