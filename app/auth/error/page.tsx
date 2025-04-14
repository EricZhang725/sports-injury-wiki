'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
  useEffect(() => {
    const errorParam = searchParams?.get('error');
    const errorDesc = searchParams?.get('error_description');
    
    setError(errorParam);
    
    // Record error and debug info
    if (errorParam) {
      console.error('Authentication error:', errorParam);
      if (errorDesc) {
        console.error('Error description:', errorDesc);
      }
      
      // Store debug info
      setDebugInfo({
        error: errorParam,
        description: errorDesc || 'No additional description',
        timestamp: new Date().toISOString(),
        url: window.location.href
      });
    }
  }, [searchParams]);
  
  const getErrorMessage = (errorCode: string | null) => {
    if (!errorCode) {
      return 'An unknown error occurred during authentication. Please try again or contact administrator.';
    }
    
    switch (errorCode) {
      case 'CredentialsSignin':
        return 'Username or password is incorrect. Please check your credentials and try again.';
      case 'SessionRequired':
        return 'You need to be logged in to access this page.';
      case 'AccessDenied':
        return 'You do not have permission to access this page.';
      case 'CallbackRouteError':
        return 'There was a problem during the login process. Please try again.';
      case 'OAuthAccountNotLinked':
        return 'This email already exists in the system. Please use another login method.';
      case 'EmailSignin':
        return 'Error sending login link. Please check your email and try again.';
      case 'Configuration':
        return 'Server configuration error. Please contact administrator.';
      case 'CLIENT_FETCH_ERROR':
        return 'Could not connect to authentication server. Please check your network connection and try again.';
      case 'undefined':
      case undefined:
        return 'Authentication server is temporarily unavailable. Please try again later or contact administrator.';
      default:
        return 'An error occurred during authentication. Please try again or contact administrator.';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Authentication Error
            </h2>
          </div>
          
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">
              {getErrorMessage(error)}
            </span>
            
            {error && (
              <div className="mt-2 text-sm text-gray-600">
                Error code: {error === 'undefined' ? 'Server communication error' : error}
              </div>
            )}
          </div>
          
          <div className="mt-6 flex flex-col space-y-4">
            <Link 
              href="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Login
            </Link>
            
            <Link 
              href="/"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Return to Home
            </Link>
          </div>
          
          {debugInfo && process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-3 text-xs bg-gray-100 rounded-md">
              <h3 className="font-bold mb-2">Debug info:</h3>
              <pre className="overflow-auto max-h-40">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 