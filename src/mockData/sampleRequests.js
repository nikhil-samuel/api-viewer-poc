export const sampleRequests = [
  {
    id: 'req-001',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T10:30:45Z',
    statusCode: 201,
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12345',
      submission_date: '2025-02-14',
      request: {
        policy_id: 'AW62-88-000111-HND',
        member_id: 'MEM12345',
        provider_id: 'PROV-123',
        event_date: '2025-02-14',
        payment_method: 'bank_transfer',
        medical_episode_id: 'EP-2025-12345',
        code: 'S82.101A',
        code_type: 'ICD10',
        description: 'Broken leg',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: true,
          accident_details: {
            date: '2025-02-12',
            location: 'Hogar',
            description: 'Fall at home'
          },
          first_symptom_date: '2025-02-12',
          first_consultation_date: '2025-02-13',
          other_insurance: {
            has_other_coverage: true,
            company_name: 'Otra Aseguradora',
            policy_number: 'OA-12345'
          },
          hospitalization: {
            is_hospitalization: true,
            hospital_name: 'Hospital General',
            admission_date: '2025-02-14',
            discharge_date: '2025-02-16'
          },
          bank_account: {
            holder: 'CHARLES HEYER',
            account_type: 'CUENTA CORRIENTE',
            account_number: '12349008',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'Tegucigalpa',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 1.2MB PDF]'
        },
        {
          document_type: 'medical_record',
          file: '[binary data not shown - 2.4MB PDF]'
        }
      ]
    },
    response: {
      id: 'SYS-REQ-001234',
      request_id: 'REQ-2025-12345',
      status: 'received',
      created_at: '2025-04-15T10:30:45Z',
      updated_at: '2025-04-15T10:30:45Z',
      message: 'Request received successfully',
      client_status: {
        bgla_status: 'in_clearinghouse',
        amigos_plus_id: 'AP-789012',
        docuface_id: 'DF-456789'
      }
    }
  },
  {
    id: 'req-002',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T11:15:22Z',
    statusCode: 400,
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12346',
      submission_date: '2025-02-15',
      request: {
        policy_id: 'AW62-88-000112-HND',
        member_id: 'MEM12346',
        provider_id: '',  // Missing provider ID
        event_date: '2025-02-15',
        payment_method: 'bank_transfer',
        description: 'Consultation for headache',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          first_symptom_date: '2025-02-14',
          first_consultation_date: '2025-02-15',
          bank_account: {
            holder: 'MARIA RODRIGUEZ',
            account_type: 'CUENTA DE AHORRO',
            account_number: '98765432',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'Tegucigalpa',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 0.8MB PDF]'
        }
      ]
    },
    response: {
      code: 400,
      message: 'Invalid request format',
      details: [
        {
          field: 'request.code',
          message: 'Diagnosis code is required'
        },
        {
          field: 'request.code_type',
          message: 'Diagnosis code type is required'
        }
      ]
    }
  },
  {
    id: 'req-003',
    method: 'GET',
    endpoint: '/request/SYS-REQ-001234',
    timestamp: '2025-04-15T10:45:12Z',
    statusCode: 200,
    request: {
      // No body for GET request
    },
    response: {
      id: 'SYS-REQ-001234',
      request_id: 'REQ-2025-12345',
      status: 'processing',
      created_at: '2025-04-15T10:30:45Z',
      updated_at: '2025-04-15T10:40:22Z',
      message: 'Request is being processed',
      client_status: {
        bgla_status: 'in_clearinghouse',
        amigos_plus_id: 'AP-789012',
        docuface_id: 'DF-456789'
      }
    }
  },
  {
    id: 'req-004',
    method: 'POST',
    endpoint: '/documents',
    timestamp: '2025-04-15T11:30:15Z',
    statusCode: 201,
    request: {
      request_id: 'REQ-2025-12345',
      document_type: 'prescription',
      file: '[binary data not shown - 0.5MB PDF]'
    },
    response: {
      id: 'DOC-12345',
      request_id: 'REQ-2025-12345',
      document_type: 'prescription',
      upload_status: 'success',
      client_status: {
        docuface_id: 'DF-123456',
        scandos_status: 'classified'
      }
    }
  }
];
