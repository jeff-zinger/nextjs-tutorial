'use client'
import React, {useEffect} from 'react';
import {createTask, editTask} from "@/utils/actions";
import {useFormState, useFormStatus} from "react-dom";
import toast from "react-hot-toast";

const initialState = {
    message: null
}

const SubmitButton = () => {
    const {pending} = useFormStatus()
    return (
        <button type={"submit"} className={"btn btn-primary btn-block btn-sm"} disabled={pending}>
            {pending ? "please wait..." : "edit"}
        </button>
    )
}

const EditForm = ({task}) => {
    const [state, formAction] = useFormState(editTask, initialState)

    const {id, completed, content} = task

    useEffect(() => {
        if (state.message === "error...") {
            toast.error("There be an error!")
        }
    },[state])

    return (
        <form action={formAction} className={"max-w-sm p-12 border border-base-300 rounded-lg"}>
            <input type="hidden" name={"id"} value={id}/>
            <input type="text" required defaultValue={content} name={"content"} className={"input input-bordered w-full mb-4"}/>
            <div className={"form-control mb-4"}>
                <label htmlFor="completed" className={"label cursor-pointer"}>
                    <span className={"label-text"}>completed</span>
                    <input type="checkbox" defaultChecked={completed} id={"completed"} name={"completed"} className={"checkbox checkbox-primary checkbox-sm"}/>
                </label>
            </div>
            <SubmitButton />
        </form>
    );
};

export default EditForm;