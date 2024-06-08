'use client'

import { useState } from "react"

export default function Crud() {
    const [state, setState] = useState({
        name:'',
        lastName: '',
        sex: '',
        birthDay: '',
        address: '',
        subdistrict: '',
        district: '',
        province: '',
        cardNumber: ''
    })

    const handleInput = (e: any) => {
        setState({...state,
            [e.target.name]:e.target.value}
        )
    }

    const onSave = () => {
        console.log(state)
    }

    return (<div style={{marginLeft: '5%', marginRight: '5%'}}>
        <div>เพิ่มพนักงาน</div>
        <div>
            <input type="text" placeholder="ชื่อ" 
            name="name"
            value={state.name}
            onChange={handleInput}
            className="form-control"/>
        </div>

        <div>
            <input type="text" placeholder="นามสกุล"
            name="lastName"
            value={state.lastName}
            onChange={handleInput}
            className="form-control"
            />
        </div>

        <div>
            <input type="text" placeholder="เพศ"
            name="sex"
            value={state.sex}
            onChange={handleInput}
            className="form-control"
            />
        </div>

        <div>
            <input type="text" placeholder="วันเดือนปีเกิด"
            name="birthDay"
            value={state.birthDay}
            onChange={handleInput}
            className="form-control"
            />
        </div>

        <div>
            <input type="text" placeholder="ที่อยุ่"
            name="address"
            value={state.address}
            onChange={handleInput}
            className="form-control"
            />
        </div>

        <div>
            <button className="btn btn-primary" onClick={onSave}>บันทึก</button>
        </div>
    </div>)
}