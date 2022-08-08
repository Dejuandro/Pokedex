import { configureStore } from "@reduxjs/toolkit"

import reducers from '../reducers'

export default configureStore(reducers)