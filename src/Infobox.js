import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import  "./Infobox.css"

function Infobox({title,cases,total, ...props}) {
    return (
        <div className="infobox">
        <Card onClick={props.onClick}>
        <CardContent>
    <Typography color="textSecondary" className="infobox__title">{title}</Typography>
    <h2 className="infobox__cases">{cases}</h2>
    <Typography color="textSecondary" className="infobox__total">{total} Total</Typography>
        </CardContent>
        </Card>
        </div>
    )
}

export default Infobox
