import React from 'react';
import './InputForm.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { formActions } from '../redux/store'
import { bindActionCreators } from 'redux'

const InputForm = props => {
    const { data, onChange } = props;

    const form = useSelector(state => state.form)
    const bears = useSelector(state => state.bear)
    const action = bindActionCreators(formActions, useDispatch())

    const addBear = async () => {
        const result = await axios.post(`http://localhost/api/bears/`, form)
        action.add_bears({...form}, {id: bears.length > 0 ? bears[bears.length - 1].id + 1 : 0})
        // console.log(bears);

        /*dispatch({
            type: "ADD_BEARS",
            bear: { ...form, id: bears.length > 0 ? bears[bears.length - 1].id + 1 : 0 } //จริง return หน้า
        })*/
    }

    return (
        <div className='form-container'>
            <h2>Add bear</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input className='inpt' type="text" onChange={(e) => action.change_name(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>
                            <input className='inpt' type="number" onChange={(e) => action.change_weight(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td>
                            <input className='inpt' type="text" onChange={(e) => action.change_img(e.target.value)} /> <br />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button className='btn' onClick={() => addBear()}>CREATE</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default InputForm