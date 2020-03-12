import React from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import './BearCard.css';
import { formActions , bearActions } from '../redux/store'
import { bindActionCreators } from 'redux'

const BearCard = props => {

    const form = useSelector(state => state.form)
    const actions = bindActionCreators(formActions, useDispatch()) //แก้ไขข้อมูลใน store
    const bearAction = bindActionCreators(bearActions, useDispatch())

    const deleteBear = async () => {
        const result = await axios.delete(`http://localhost/api/bears/${props.id}`)
        actions.delete_bears(props.id)
        /*dispatch({
            type: "DELETE_BEARS",
            id: props.id
        })*/


    }

    const updateBear = async () => {
        const result = await axios.put(`http://localhost/api/bears/${props.id}`, form)
        actions.update_bears({...form},props.id)
        /*dispatch({
            type: "UPDATE_BEARS",
            id: props.id,
            bear: { ...form, id: props.id }
        })*/
    }


    return (
        <div className='bearcard-container'>
            <div className='bearcard' style={{ backgroundImage: `url('${props.img}')` }}>
                <p className='bearcard-weight'>{props.weight}</p>
                <p className='bearcard-name'>{props.name}</p>
            </div>
            <div className='bearcard-actions'>
                <div onClick={updateBear}>Update</div>
                <div onClick={deleteBear}>Delete</div>
            </div>
        </div>

    )
}

export default BearCard;