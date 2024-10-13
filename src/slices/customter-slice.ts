import { RootState } from "@/store";
import { Customer, ListCustomerResponse } from "@/types/customer-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerState {
    data : Customer[];
    loading : boolean;
    error: string | null;
    total: number;
}

const initialState: CustomerState = {
    data: [],
    loading:false,
    error: null,
    total: 0,
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },  
        fetchCustomers(state, action: PayloadAction<ListCustomerResponse>) {
            state.data = action.payload.items;
            state.total = action.payload.total;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        }
    }
});

export const {
    setLoading,
    fetchCustomers,
    setError,
} = customerSlice.actions;

export const selectCustomers = (state: RootState) => state.customer;

export default customerSlice.reducer;