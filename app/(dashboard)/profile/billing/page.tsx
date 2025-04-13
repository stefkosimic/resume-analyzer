"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Manage your billing information and view your billing history.
        </p>
      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>
              Manage your payment methods for subscription billing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <CreditCard className="h-5 w-5" />
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">
                      Expires 12/24
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Remove
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              View your past invoices and payments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Invoice #INV-001</p>
                  <p className="text-sm text-muted-foreground">Jan 1, 2023</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-medium">$29.00</p>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Invoice #INV-002</p>
                  <p className="text-sm text-muted-foreground">Feb 1, 2023</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-medium">$29.00</p>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Invoice #INV-003</p>
                  <p className="text-sm text-muted-foreground">Mar 1, 2023</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-medium">$29.00</p>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
