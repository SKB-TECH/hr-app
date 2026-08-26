"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { switchActiveCompany } from "@/core/services/company/switch-active-company.service";
import { companyKeys } from "./company-query-keys";

export function useSwitchActiveCompany() {
  const client = useQueryClient();
  return useMutation({ mutationFn: switchActiveCompany, onSuccess: (company) => {
    client.setQueryData(companyKeys.mine, company);
    void client.invalidateQueries({ queryKey: companyKeys.all });
    void client.invalidateQueries({ queryKey: ["jobs"] });
    void client.invalidateQueries({ queryKey: ["applications"] });
  }});
}
