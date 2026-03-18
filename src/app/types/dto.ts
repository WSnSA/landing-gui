export type Role = "USER" | "ADMIN" | string;

export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  fullname: string;
  email: string;
  registerNumber: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}
export interface RegisterResponse {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface ForgotPasswordRequest { email: string; }

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest { refreshToken: string; }
export interface RefreshTokenResponse { accessToken: string; refreshToken: string; }
export interface LogoutRequest { refreshToken: string; }

// /api/auth/me
export interface MeResponse {
  id: number;
  email: string;
  fullName: string;
  role: Role;
}

export interface UserSummaryResponse {
  id: number;
  email: string;
  fullName: string;
  role: Role;
}

export type LandingStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED" | string;

export interface CreateLandingRequest {
  name: string;
  slug?: string | null;
  templateId?: number | null;
}
export interface UpdateLandingRequest {
  name?: string | null;
  slug?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  configJson?: string | null;
}
export interface LandingResponse {
  id: number;
  name: string;
  slug: string;
  status: LandingStatus;
  templateId: number | null;
  seoTitle: string | null;
  seoDescription: string | null;
  configJson: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface CreatePageRequest {
  title: string;
  path: string;
  orderIndex?: number | null;
}
export interface UpdatePageRequest {
  title?: string | null;
  path?: string | null;
  orderIndex?: number | null;
}
export interface PageResponse {
  id: number;
  landingId: number;
  title: string;
  path: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSectionRequest {
  sectionKey: string;
  title?: string | null;
  orderIndex?: number | null;
}
export interface UpdateSectionRequest {
  sectionKey?: string | null;
  title?: string | null;
  orderIndex?: number | null;
}
export interface SectionResponse {
  id: number;
  pageId: number;
  sectionKey: string;
  title: string | null;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComponentRequest {
  componentType: string;
  propsJson?: string | null;
  orderIndex?: number | null;
}
export interface UpdateComponentRequest {
  componentType?: string | null;
  propsJson?: string | null;
  orderIndex?: number | null;
}
export interface ComponentResponse {
  id: number;
  sectionId: number;
  componentType: string;
  propsJson: string | null;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

// Backend ReorderRequest: { ids: [1,2,3] } (шинэ дарааллын id-ууд)
export interface ReorderRequest {
  ids: number[];
}

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELED" | string;
export type PaymentProvider = "QPAY" | "MANUAL" | string;

export interface PaymentCheckoutRequest { planCode: string; }
export interface PaymentCheckoutResponse {
  paymentId: number;
  invoiceId: string;
  status: PaymentStatus;
}

export interface PaymentSummaryResponse {
  id: number;
  subscriptionId: number | null;
  provider: PaymentProvider;
  status: PaymentStatus;
  amount: string; // BigDecimal -> string
  currency: string;
  invoiceId: string | null;
  paidAt: string | null;
  createdAt: string;
}

export interface ManualMarkPaidRequest { paymentId: number; }

export type SubscriptionStatus = "ACTIVE" | "INACTIVE" | "EXPIRED" | string;
export interface SubscriptionMeResponse {
  planCode: string;
  status: SubscriptionStatus;
  startAt: string | null;
  endAt: string | null;

  maxLandings: number;
  maxDomains: number;
  allowCustomDomain: boolean;
  allowPublish: boolean;
}

// Template
export interface TemplateResponse {
  id: number;
  name: string;
  type: string;
  description: string;
  previewImageUrl: string | null;
  schemaJson: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateRequest {
  name: string;
  type: string;
  description: string;
  previewImageUrl?: string | null;
  schemaJson?: string | null;
}

export interface PublicLandingResponse {
  id: number;
  name: string;
  slug: string;
  seoTitle: string | null;
  seoDescription: string | null;
  configJson: string | null;
  publishedAt: string;
  pages: Array<{
    id: number;
    title: string;
    path: string;
    orderIndex: number;
    sections: Array<{
      id: number;
      sectionKey: string;
      title: string | null;
      orderIndex: number;
      components: Array<{
        id: number;
        componentType: string;
        propsJson: string | null;
        orderIndex: number;
      }>;
    }>;
  }>;
}
