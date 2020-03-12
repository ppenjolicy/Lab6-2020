import React, { useEffect } from 'react';
import BearCard from './BearCard';
import axios from 'axios'
import './BearList.css';
import { useDispatch, useSelector } from 'react-redux'
import { formActions , bearActions } from '../redux/store'
import { bindActionCreators } from 'redux'


const BearList = props => {

    const bears = useSelector(state => state.bear) //ดึงข้อมูล
    const actions = bindActionCreators(formActions, useDispatch()) //แก้ไขข้อมูลใน store
    const bearAction = bindActionCreators(bearActions, useDispatch())

    const getBear = async () => {
        const result = await axios.get(`http://localhost/api/bears`)
        /*const action = {
            type: 'GET_BEARS',
            bears: result.data
        } */ // actionที่เรากำหนด ดึงข้อมูลมา
        actions.get_bears(result.data) //ส่งค่ามาจาก store
        console.log(result.data);
        
    }

    useEffect(() => {
        bearAction.getBears()
    }, [])

    if (!bears || !bears.length)
        return (<h2>No bears</h2>)

    return (
        <div className='bearlist-container'>
            {
                bears.map((bear, index) => (
                    <div key={index} style={{ margin: 5 }}>
                        <BearCard  {...bear} />
                    </div>
                ))
            }
        </div>

    )
}

export default BearList;