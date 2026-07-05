'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';

import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from '@/components/core/card';
import { Button } from '@/components/core/button';

interface ErrorBoundaryState {
  errorId: string;
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface EnterpriseErrorBoundaryProps {
  children: ReactNode;
  enableRetry?: boolean;
  organizationId?: string;
  showErrorDetails?: boolean;
  fallbackLevel?: 'page' | 'component' | 'section';
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void;
}

export class EnterpriseErrorBoundary extends Component<
  EnterpriseErrorBoundaryProps,
  ErrorBoundaryState
> {
  private retryCount = 0;
  private readonly maxRetries = 3;

  constructor(props: EnterpriseErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    this.props.onError?.(error, errorInfo, this.state.errorId);

    if (typeof window !== 'undefined') {
      console.group('🚨 Enterprise Error Boundary');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Organization:', this.props.organizationId);
      console.error('Error ID:', this.state.errorId);
      console.groupEnd();
    }
  }

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: '',
      });
    }
  };

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  private handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/home';
    }
  };

  private renderFallbackUI() {
    const {
      fallbackLevel = 'component',
      showErrorDetails = false,
      enableRetry = true,
    } = this.props;
    const { error, errorInfo, errorId } = this.state;

    const getFallbackContent = () => {
      switch (fallbackLevel) {
        case 'page':
          return {
            title: 'Sayfa Yüklenemedi',
            description:
              'Bu sayfada beklenmeyen bir hata oluştu. Ana sayfaya dönebilir veya sayfayı yenileyebilirsiniz.',
            actions: (
              <div className="flex gap-2">
                <Button onClick={this.handleGoHome} variant="default">
                  <Home className="mr-2 h-4 w-4" />
                  Ana Sayfaya Dön
                </Button>
                <Button onClick={this.handleReload} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sayfayı Yenile
                </Button>
              </div>
            ),
          };
        case 'section':
          return {
            title: 'Bölüm Yüklenemedi',
            description:
              'Bu bölümde bir hata oluştu. Sayfayı yenileyerek tekrar deneyebilirsiniz.',
            actions:
              enableRetry && this.retryCount < this.maxRetries ? (
                <Button onClick={this.handleRetry} variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Tekrar Dene ({this.maxRetries - this.retryCount} kalan)
                </Button>
              ) : (
                <Button onClick={this.handleReload} variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sayfayı Yenile
                </Button>
              ),
          };
        default:
          return {
            title: 'Bileşen Hatası',
            description: 'Bu bileşende beklenmeyen bir hata oluştu.',
            actions:
              enableRetry && this.retryCount < this.maxRetries ? (
                <Button onClick={this.handleRetry} variant="ghost" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Tekrar Dene
                </Button>
              ) : null,
          };
      }
    };

    const content = getFallbackContent();

    return (
      <Card
        className={
          fallbackLevel === 'page' ? 'mx-auto mt-20 max-w-md' : 'w-full'
        }
      >
        <CardHeader className="pb-3 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-alert-red/10">
            <AlertTriangle className="h-6 w-6 text-alert-red" />
          </div>
          <CardTitle className="text-lg font-semibold text-alert-red">
            {content.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-ash/70">{content.description}</p>

          {content.actions}

          {showErrorDetails && error && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-xs text-ash/70 hover:text-titanium">
                Teknik Detaylar (ID: {errorId})
              </summary>
              <pre className="mt-2 overflow-x-auto rounded-sm bg-gunmetal/10 p-2 text-xs">
                {error.toString()}
                {errorInfo?.componentStack}
              </pre>
            </details>
          )}

          <div className="border-t pt-2">
            <p className="text-xs text-ash/70">
              Sorun devam ederse{' '}
              <button
                className="underline hover:no-underline"
                onClick={() => window.open('mailto:support@starkon.com')}
              >
                <Mail className="mr-1 inline h-3 w-3" />
                destek@starkon.com
              </button>{' '}
              adresinden iletişime geçin.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.renderFallbackUI();
    }

    return this.props.children;
  }
}

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
  level?: 'page' | 'component' | 'section';
  organizationId?: string;
  showErrorDetails?: boolean;
}

export function ErrorBoundaryWrapper({
  children,
  level = 'component',
  organizationId,
  showErrorDetails = process.env.NODE_ENV === 'development',
}: ErrorBoundaryWrapperProps) {
  const handleError = (error: Error, errorInfo: ErrorInfo, errorId: string) => {
    // Error logging can be implemented here
    // For now, just log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ErrorBoundary-${errorId}]`, {
        error,
        errorInfo,
        organizationId,
      });
    }
  };

  return (
    <EnterpriseErrorBoundary
      fallbackLevel={level}
      organizationId={organizationId}
      onError={handleError}
      showErrorDetails={showErrorDetails}
      enableRetry={level !== 'page'}
    >
      {children}
    </EnterpriseErrorBoundary>
  );
}
