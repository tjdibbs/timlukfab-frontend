"use client"

import { useEffect } from "react"
import { setUser } from "./redux/features/user"
import { useGetUserQuery } from "./redux/services/user"
import { useAppDispatch, useAppSelector } from "./redux/store"
import useMessage from "@/hooks/useMessage"


const GetUser = () => {
  const dispatch = useAppDispatch()
  const id = useAppSelector(state => state.auth.id)

  const { data, refetch, isError } = useGetUserQuery(String(id), { skip: !id })

  const { alertMessage } = useMessage()

  useEffect(() => {
    if (!id) {
      return
    }

    if (isError) {
      alertMessage("We are having problems with the server", "error")
    }

    refetch()

    if (data) {
      dispatch(setUser(data))
    }
  }, [id, data, isError])

  return null
}

export default GetUser
