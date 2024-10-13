import { RootState } from "@/store";
import { CustomerGroup } from "@/types/customerGroup";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from '@reduxjs/toolkit';

interface CustomerGroupState {
    groups: CustomerGroup[];
    loading : boolean;
    error: string | null;
}

const initialState: CustomerGroupState = {
    groups: [],
    loading:false,
    error: null,
};

const customerGroupSlice = createSlice({
    name: 'customerGroup',
    initialState,
    reducers: {
        fetchCustomerGroupsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCustomerGroupsSuccess(state, action: PayloadAction<CustomerGroup[]>) {
            state.loading = false;
            state.groups = action.payload;
        },
        fetchCustomerGroupsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchCustomerGroupsStart,
    fetchCustomerGroupsSuccess,
    fetchCustomerGroupsFailure,
} = customerGroupSlice.actions;

export const selectCustomerGroups = (state: RootState) => state.customerGroup.groups;
export const selectCustomerGroupsLoading = (state: RootState) => state.customerGroup.loading;
export const selectCustomerGroupsError = (state: RootState) => state.customerGroup.error;

export default customerGroupSlice.reducer;