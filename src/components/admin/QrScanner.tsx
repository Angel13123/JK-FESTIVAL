"use client";

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Video, ScanLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QrScannerProps {
  onScanSuccess: (decodedText: string) => void;
  isScannerActive: boolean;
  setIsScannerActive: (isActive: boolean) => void;
}

export function QrScanner({ onScanSuccess, isScannerActive, setIsScannerActive }: QrScannerProps) {
  const scannerRegionRef = useRef<HTMLDivElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!isScannerActive || !scannerRegionRef.current) return;

    const html5QrCode = new Html5Qrcode(scannerRegionRef.current.id);
    let scannerRunning = true;

    const startScanner = async () => {
        try {
            await Html5Qrcode.getCameras(); // This will prompt for permission if not granted
            setHasCameraPermission(true);

            if (html5QrCode.getState() === Html5QrcodeScannerState.SCANNING) {
               return;
            }

            html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                (decodedText, decodedResult) => {
                    if (scannerRunning) {
                        onScanSuccess(decodedText);
                        setIsScannerActive(false); 
                    }
                },
                (errorMessage) => {
                    // handle errors, e.g. QR code not found.
                }
            ).catch(err => {
                console.error("Error starting QR scanner:", err);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Error de cámara',
                    description: 'No se pudo iniciar el escáner. Revisa los permisos de la cámara.',
                });
            });
        } catch (err) {
            console.error("No cameras found or permission denied:", err);
            setHasCameraPermission(false);
            toast({
                variant: 'destructive',
                title: 'Permiso de cámara denegado',
                description: 'Por favor, habilita el acceso a la cámara en tu navegador.',
            });
        }
    };

    const stopScanner = () => {
        scannerRunning = false;
        if (html5QrCode && html5QrCode.isScanning) {
            html5QrCode.stop().catch(err => console.error("Error stopping scanner:", err));
        }
    };
    
    startScanner();

    return () => {
        stopScanner();
    };
  }, [isScannerActive, onScanSuccess, setIsScannerActive, toast]);

  if (!isScannerActive) {
    return (
        <Button onClick={() => setIsScannerActive(true)} variant="outline" className='w-full'>
            <ScanLine className="mr-2 h-4 w-4" />
            Escanear con Cámara
        </Button>
    );
  }

  return (
    <div className='space-y-4'>
        <div id="qr-scanner-region" ref={scannerRegionRef} className="w-full rounded-md border" />
        {!hasCameraPermission && (
            <Alert variant="destructive">
                <Video className="h-4 w-4" />
                <AlertTitle>Acceso a la cámara denegado</AlertTitle>
                <AlertDescription>
                    Por favor, permite el acceso a la cámara en los ajustes de tu navegador para usar el escáner.
                </AlertDescription>
            </Alert>
        )}
        <Button onClick={() => setIsScannerActive(false)} variant="secondary" className='w-full'>Cancelar</Button>
    </div>
  );
}
