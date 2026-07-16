import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const AUTH_STORAGE_KEY = "novacart:auth";
const DEMO_EMAIL = "demo@novacart.com";
const DEMO_PASSWORD = "password123";

export interface AuthUser {
  email: string;
  name: string;
}

export interface AuthState {
  user: AuthUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

function loadUserFromStorage(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

const initialState: AuthState = {
  user: loadUserFromStorage(),
  status: "idle",
  error: null,
};

export const login = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  // Simulated network delay for a realistic mock authentication flow.
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return rejectWithValue("Incorrect email or password. Try the demo account below.");
  }

  return { email: DEMO_EMAIL, name: "Nova Demo" };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch {
        // ignore
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(action.payload));
        } catch {
          // ignore
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Login failed. Please try again.";
      });
  },
});

export const { logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState): AuthUser | null => state.auth.user;
export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.user !== null;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
