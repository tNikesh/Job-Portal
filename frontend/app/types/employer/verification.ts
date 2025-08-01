export interface verificationHelper {
    id: number;
    employer_id: number;
    document_type: string;        // e.g., 'VAT', 'PAN', 'Registration Certificate'
    document_number: string;
    document_file: string;        // Stored file path, e.g., 'verification_docs/file.pdf'
    document_file_url?: string;   // Full public URL for accessing the document
  
    verified_at?: string | null;  // ISO date string or null if not verified
    created_at?: string;          // ISO date string
    updated_at?: string;          // ISO date string
  }
  