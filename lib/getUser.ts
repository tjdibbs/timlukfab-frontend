"use client"

import { useEffect } from "react"
import { setUser } from "./redux/features/user"
import { useGetUserQuery } from "./redux/services/user"
import { useAppDispatch, useAppSelector } from "./redux/store"


const GetUser = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)

  const { data } = useGetUserQuery(String(auth.id) ?? '')

  useEffect(() => {
    if (data) {
      dispatch(setUser(data))
    }
  }, [data])

  return null
}

export default GetUser
